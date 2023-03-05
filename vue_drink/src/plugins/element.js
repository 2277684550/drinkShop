import Vue from 'vue'
import { 
    Button,
    Form,
    FormItem,
    Input,
    Message,
    Container,
    Header,
    Main,
    Row,
    Col,
    Avatar,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Carousel,
    CarouselItem,
    Tabs,
    TabPane,
    PageHeader,
    Upload,
    Image,
    Table,
    TableColumn

} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(PageHeader)
Vue.use(Upload)
Vue.use(Image)
Vue.use(Table)
Vue.use(TableColumn)


// message弹窗需要全局挂载，把它挂载到vue打原型上面，$message是一个自定义属性，可以自定义名称
// 后面的必须是组件名，这样每一个组件都可以通过this来访问$message，访问的$message就可以用弹窗了
Vue.prototype.$message = Message
// Vue.prototype.$confirm = MessageBox.confirm

