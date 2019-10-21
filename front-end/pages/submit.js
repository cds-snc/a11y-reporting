import React from "react";
import TextInput from "../components/textInput";

export class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagesToScan: [<TextInput key="slug0" name="slug0" label="Page Slug:" hint="Examples: '/' for the home page, '/team' for a subpage"></TextInput>]
    }
  }
  addPage = () => {
    console.log("adding page")
    let name = "slug" + this.state.pagesToScan.length;
    let newPage = <TextInput key={name} name={name} label="Page Slug:"></TextInput>
    this.setState({pagesToScan: this.state.pagesToScan.concat(newPage)});
  }
  submitScans = (e) => {
    e.preventDefault();
    console.log("submitting");

    //submit requests to gcloud - 1 per slug
    // get the urls

    let slugs = this.state.pagesToScan;
    for (let slug in slugs) {
      // get baseurl
      console.log(slugs[slug])
      console.log(slugs[slug].value)
    }

    // update view to confirmation page
  }
  render() {
    return (
      <div>
        <h1>Submit pages for a11y scanning:</h1>
  
        <div>Welcome to Next.js!</div>
  
        <form onSubmit={this.submitScans}>
          <TextInput name="baseURL" label="Base Url:" hint="Include 'https://' before your url, and omit any trailing '/'"></TextInput>
  
          {this.state.pagesToScan}
          <button type="button" onClick={this.addPage}>Add another Page</button>

          <input type="submit" value="Submit pages to be scanned" />
        </form>
      </div>
    )
  }
}

export default Submit