package main
import (
	"fmt"
	"html/template"
	"net/http"
)

const (
	Port=":8080"
)
func serve(w http.ResponseWriter, r *http.Request){
	t, err := template.ParseFiles("main.html")
	if err !=nil {
		fmt.Println(err)
	}
	type items struct{
		Header string
		Est string
}


t.Execute(w, items{Header:"I love BB!!",Est: "Forever."})
}
func main(){
	http.Handle("/",http.FileServer(http.Dir("./Forgo/main.go")))
	http.HandleFunc("/ping", serve)
	http.ListenAndServe(Port, nil)
}
