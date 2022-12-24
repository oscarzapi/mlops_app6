import '../App.css';
import {Component} from 'react'
function FileUpload() {
  return (
    <div className="FileUpload">
      Batch Processing
      <FormBatch></FormBatch>
    </div>
  );
}

export default FileUpload;

class FormBatch extends Component {
  constructor(props){
    super(props)
    this.state={selectFile:null, respFromServer:null, output:false}
  
    this.handleFile=this.handleFile.bind(this)
    this.handleUpload=this.handleUpload.bind(this)

  }

  handleFile(event){
    console.log(event.target.value)
    this.setState({[event.target.name]:event.target.files[0]})
  }
  handleUpload = async (event) => {
    event.preventDefault()
    const url = 'http://localhost:8000/scoreFile'
    const fileToSend = this.state.selectFile
    var formData = new FormData()
    formData.append('filePath', this.state.selectFile,this.state.selectFile.name)
    const reqOpt = {method:'POST', body:formData}

    const resp = await fetch(url, reqOpt)
    const resp2 = await resp.json()
    this.setState({respFromServer:resp2.result})

    this.setState({output:true})
    console.log(resp2.result)

  }

  render(){
    const iterData = this.state.respFromServer
    const checkPoint = this.state.output
    let finalTableData
    if (checkPoint) {

      const tableData = iterData.map(e => 
        <tr>
          <td>{e[0]}</td>
          <td>{e[1]}</td>
        </tr>)
      finalTableData =<table>
        <tbody>
          <tr>
            <td>Id</td>
            <td>Propability</td>
          </tr>
          {tableData}
        </tbody>
      </table>
    } else{
      finalTableData='no response'
    }
    return(
      <div>
        <form onSubmit={this.handleUpload}>
          Batch Processing
          <input type='file' name='selectFile' onChange={this.handleFile}></input>
          <input type='submit' value='submit'></input>
        </form>
        <div>
          {finalTableData}
        </div>
      </div>
    )
  }
}