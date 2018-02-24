package handlers

import (
	"fmt"
	"net/http"
)

func init() {
	http.HandleFunc("/", hello)
}

func hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Hi there!!!</h1>")
}
