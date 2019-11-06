import React, { Component } from 'react'
import PropTypes from 'prop-types'
import connect from './React-redux'

class ThemeSwitch extends Component{
  static propTypes = {
    themeColor: PropTypes.string,
    onSwitchColor: PropTypes.func
  }
  
  render () {
    return (
      <div>
        <button
          style={{ color: this.props.themeColor }}
          onClick={()=>this.props.handleClick('red')}>Red</button>
        <button
          style={{ color: this.props.themeColor }}
          onClick={()=>this.props.handleClick('blue')}
          >Blue</button>
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    themeColor : state.themeColor
  }
}

const mapDispatchToProps = dispatch=>{
  return {
    handleClick(color){
      dispatch({type:"CHANGE_COLOR",themeColor:color})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ThemeSwitch)