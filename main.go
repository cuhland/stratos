package main

import (
	"crypto/tls"
	"fmt"
	"net/http"
	"time"

	"github.com/BurntSushi/toml"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo"
	"github.com/labstack/echo/engine/standard"
	"github.com/labstack/echo/middleware"
)

var (
	cookieStore *sessions.CookieStore
	httpClient  = http.Client{}
)

func main() {
	var (
		portalConfig portalConfig
		portalProxy  portalProxy
	)

	// Load portal configuration
	if _, err := toml.DecodeFile("portal-config.toml", &portalConfig); err != nil {
		fmt.Println(err)
		return
	}
	portalProxy.Config = portalConfig

	tr := &http.Transport{}
	if portalConfig.Dev {
		tr.TLSClientConfig = &tls.Config{InsecureSkipVerify: portalConfig.DevConfig.SkipTLSVerification}
	} else {
		tr.TLSClientConfig = &tls.Config{InsecureSkipVerify: portalConfig.SkipTLSVerification}
	}

	httpClient.Transport = tr
	httpClient.Timeout = time.Second * portalConfig.HTTPClientTimeout

	start(&portalProxy)

}

func start(p *portalProxy) {
	e := echo.New()
	// Root level middleware
	e.Use(sessionCleanupMiddleware)
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	initCookieStore(p)
	registerRoutes(e, p)

	e.Run(standard.NewFromTLS(p.Config.TLSAddress, p.Config.TLSCertFile, p.Config.TLSCertKey))
}

func initCookieStore(p *portalProxy) {
	cookieStore = sessions.NewCookieStore([]byte(p.Config.CookieStoreSecret))
}

func registerRoutes(e *echo.Echo, p *portalProxy) {
	e.Get("/v1/auth/login", p.login)
	e.Get("/v1/auth/logout", p.logout)

	group := e.Group("/v1/proxy")
	group.Use(sessionMiddleware)
	group.Get("/hcf", hcf)
	group.Get("/hce", hce)
}
