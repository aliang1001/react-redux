# react-redux
react-redux的简陋实现
function createStore(reducer){
    let state = null; //初始化，定义state
    const listeners = [] // 存储监听函数的数组
    const subscribe = listener=> listeners.push(listener) //监听器
    const getState = ()=> state // 获取state的接口
    const dispatch = action=>{ // 通过dispatch来对state的修改，订阅，以及暴露
        state = reducer(state,action) 
        listeners.forEach(listener=>listener()) 
    }
    dispatch({}) //第一次调用，初始化state
    return { getState , dispatch , subscribe }  // 暴露接口
}

const themeReducer = (state,action)=>{
    if(!state) return {
        themeColor: 'red'
    }
    switch (action.type) {
        case 'CHANGE_COLOR':
          return { ...state, themeColor: action.themeColor }
        default:
          return state
      }
}
const store = createStore(themeReducer)
// 我们就把它抽象出来一个 createStore，它可以产生 store，里面包含 getState 和 dispatch， 
// 后来发现每次修改数据都需要手动重新渲染非常麻烦，我们希望自动重新渲染视图。所以后来加入了订阅者模式
// 可以通过 store.subscribe 订阅数据修改事件，每次数据更新的时候自动函数重新渲染视图。
/////////////////////////////////////////////////////

const connect = (mapStateToProps,mapDispatchToProps) => (WrappedComponent) => {
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
