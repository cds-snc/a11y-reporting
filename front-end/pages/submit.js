import React from "react";
import TextInput from "../components/textInput";

export class Submit extends React.Component {
  constructor(props) {
    super(props);
    let statuses = [""];
    this.state = {
      baseURL: "",
      pagesToScan: [{name: "slug0", hint:"Examples: '/' for the home page, '/team' for a subpage", status: ""}],
      slugs: []
    }
  }
  addPage = () => {
    let name = "slug" + this.state.pagesToScan.length;
    let newPage = [{name: name, hint:"", status: ""}];
    this.setState({pagesToScan: this.state.pagesToScan.concat(newPage)});
    console.log(this.state.pagesToScan);
  }
  submitScans = async (e) => {
    e.preventDefault();

    //submit requests to gcloud - 1 per slug
    let slugs = this.state.slugs;
    for (let slug in slugs) {
      let fetchurl = "https://a11y-reporting-hanuv4jn2q-ue.a.run.app/?baseURL=" + this.state.baseURL + "&slug=" + slugs[slug];

      // add loading indicator
      let pages = this.state.pagesToScan;
      pages[slug].status = "sent";
      this.setState({pagesToScan: pages});

      console.log("fetching from: " + fetchurl);
      fetch(fetchurl, {
        mode:'no-cors'
      })
        .then(function(response) {
          console.log(response);
          return response.json();
        }).then(function(data) {
          // add success indicator
          pages[slug].status = "success";
          this.setState({pagesToScan: pages});
          console.log("response received: " + data);
        }).catch(err => {
          // add failure indicator
          pages[slug].status ="error";
          this.setState({pagesToScan: pages});
          console.error(err);
        });
    }

    // update view to confirmation page
  }
  updateBaseUrl = (e) => {
    this.setState({baseURL: e.target.value});
  }
  updateSlug = (e) => {
    let newSlugs = this.state.slugs;
    newSlugs[e.target.name.slice(-1)] = e.target.value;
    this.setState({slugs: newSlugs});
  }
  render() {
    return (
      <div>
        <h1>Submit pages for a11y scanning:</h1>
  
        <div>Welcome to Next.js!</div>
  
        <form onSubmit={this.submitScans}>
          <TextInput 
            name="baseURL"
            label="Base Url:"
            hint="Include 'https://' before your url, and omit any trailing '/'"
            onchange={this.updateBaseUrl}
          ></TextInput>
  
          {this.state.pagesToScan.map(page => (
            <TextInput key={page.name} name={page.name} label="Page Slug:" hint={page.hint} onchange={this.updateSlug} status={page.status}></TextInput>
          ))}
          <button type="button" onClick={this.addPage}>Add another Page</button>

          <input type="submit" value="Submit pages to be scanned" />
        </form>
      </div>
    )
  }
}

export default Submit