import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from './React-redux'
class Header extends Component {
    static propsTypes = {
        themeColor: PropTypes.string
    }
    
    render () {
      return (
        <h1 style={{ color: this.props.themeColor }}>出师表/前出师表</h1>
      )
    }
  }
  const mapStateToProps = state=>{
      return {
          themeColor : state.themeColor
      }
  }

export default connect(mapStateToProps)(Header);


