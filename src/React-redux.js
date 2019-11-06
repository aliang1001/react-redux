import React,{ Component } from 'react'
import PropTypes from 'prop-types'


export const connect = (mapStateToProps,mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
          store: PropTypes.object
        }
    
        constructor () {
          super()
          this.state = { allProps: {} }
        }
    
        componentWillMount () {
          const { store } = this.context
          this._updateProps()
          store.subscribe(() => this._updateProps())
        }
    
        _updateProps () {
          const { store } = this.context
          let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {}
          let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch,this.props) : {}
          this.setState({
            allProps: { // 整合普通的 props 和从 state 生成的 props
              ...stateProps,
              ...dispatchProps,
              ...this.props
            }
          })
        }
    
        render () {
          return <WrappedComponent {...this.state.allProps} />
        }
      }
    
      return Connect
    }

export class Provider extends Component{
    static propTypes = {
        store : PropTypes.object,
        children: PropTypes.any
    }
    static childContextTypes = {
        store : PropTypes.object
    }
    
    getChildContext(){
        return {
            store:this.props.store
        }
    }
    render(){
        return (
            <div>{this.props.children}</div>
        )
    }
}

export default connect


// 高阶组件，我们可以把一些可复用的逻辑放在高阶组件当中，高阶组件包装的新组件和原来的组件之间通过props传递信息，减少代码的重复程度。
// 对于第二个问题，我们得弄清楚一件事情，到底什么样的组件才叫复用性强的组件。
// 如果一个组件对外界的依赖过于强，那么这个组件的移植性会很差，就像这些严重依赖context的组件一样，如果一个组件的渲染只依赖于外界传进去的props和自己的state,而并不依赖于其他的外界的任何数据，也就是说像纯函数一样，给它什么，它就吐出什么(渲染)什么出来，这种组件的复用性是最强的，别人使用的时候根本就不用担心任何事情，只要看看PropsTypes它能接受什么参数，然后把参数传进去控制它就行了，我们叫这种组件叫Pure Component，因为它就像纯函数一样。