import React from "react";
import styled from "styled-components";
import TextInput from "../components/textInput";

export class Submit extends React.Component {
  constructor(props) {
    super(props);
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
  }
  submitScans = async (e) => {
    e.preventDefault();

    //submit requests to gcloud - 1 per slug
    let slugs = this.state.slugs;
    for (let slug in slugs) {
      let fetchurl = process.env.API_URL + "/submit?baseURL=" + this.state.baseURL + "&slug=" + slugs[slug];

      // add loading indicator
      let pages = this.state.pagesToScan;
      pages[slug].status = "sent";
      this.setState({pagesToScan: pages});

      fetch(fetchurl)
        .then(response => {
          console.log(response.ok)
          return response;
        }).then(data => {
          // add success indicator
          if (data.status == 200)
            pages[slug].status = "success";
          else
            pages[slug].status ="error";
          this.setState({pagesToScan: pages});
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
    const Button = styled.button`
      height: 2em;
      font-size: 16px;
      margin: 0.5em;
    `;
    const SubmitButton = styled.input`
      font-size: 16px;
      margin: 0.5em;
    `;

    const Header = styled.h1`
      font-family: sans-serif;
    `;
    return (
      <div>
        <Header>Submit pages for a11y scanning:</Header>
  
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
          <Button type="button" onClick={this.addPage}>Add another Page</Button>

          <SubmitButton type="submit" value="Submit pages to be scanned" />
        </form>
      </div>
    )
  }
}

export default Submit