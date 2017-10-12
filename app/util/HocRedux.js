/**
 * 为组件传递 redux
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionsLists from '../actions/actionsLists'

let getDisplayName = component=> {
  return component.displayName || component.name || 'Component'
}

let mapStateToProps = (state)=>{
  return {
    reduxState: state
  }
}
let mapDispatchToProps = (dispatch)=>{
  return {
    reduxActions: bindActionCreators(actionsLists, dispatch)
  }
}

export default ChildComponent =>
connect(
  mapStateToProps,
  mapDispatchToProps
)(class HocInheritance extends ChildComponent {
  static displayName = `HocInheritance(${getDisplayName(ChildComponent)})`
})