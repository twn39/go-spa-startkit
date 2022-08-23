package main

import (
	"embed"
	_ "embed"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"html/template"
	"io"
	"io/fs"
	"net/http"
)

//go:embed public/build/*
var staticFs embed.FS

//go:embed views/*.html
var viewsFs embed.FS

type Entry struct {
	EntryPoints struct {
		App struct {
			Js  []string `json:"js"`
			Css []string `json:"css"`
		} `json:"app"`
	} `json:"entrypoints"`
}

func main() {
	views := template.Must(template.ParseFS(viewsFs, "views/*.html"))
	r := gin.Default()
	r.SetHTMLTemplate(views) // Since SetHTMLTemplate() is NOT thread-safe. It should only be called at initialization

	fSys, _ := fs.Sub(staticFs, "public")
	entryFile, _ := fSys.Open("build/entrypoints.json")
	data, err := io.ReadAll(entryFile)
	if err != nil {
		panic(err.Error())
	}
	var entry Entry
	err = json.Unmarshal(data, &entry)
	if err != nil {
		panic(err.Error())
	}

	r.StaticFS("/public", http.FS(fSys))
	r.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.html", entry)
	})
	r.NoRoute(func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.html", entry)
	})

	err = r.Run(":8080")
	if err != nil {
		panic(err.Error())
	} // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
