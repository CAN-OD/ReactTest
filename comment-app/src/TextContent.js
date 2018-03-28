import HighComponent from './HighComponent'
import React,{Component} from 'react'

class TextContent extends Component{

  render(){
    return(
      <input value={JSON.parse(this.props.data)[0].content} />
    )
  }
}

TextContent =HighComponent(TextContent,'comments')
export default TextContent

