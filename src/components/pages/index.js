import Home from './Home'
import TaskList from './TaskList'
import ContextList from './ContextList'
import NotFound from './NotFound'

export default {
  HOME: { title: 'Home', Component: Home },
  TASK_LIST: { title: 'Tasks', Component: TaskList },
  CONTEXT_LIST: { title: 'Contexts', Component: ContextList },
  NOT_FOUND: { title: 'Not Found', Component: NotFound },
}
