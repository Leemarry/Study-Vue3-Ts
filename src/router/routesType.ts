

import { title } from 'process';
import { RouteMeta,RouteRecordRaw} from 'vue-router'


export interface page {
    title:string,
    menuOrder:number
}

export interface MyRouteMeta extends RouteMeta {  
    title: string;  
    menuOrder: number;  
} 


// 假设你的路由记录类型与 RouteRecordRaw 类似，但可能不包含 redirect 等属性  
export type MyRouteRecord = RouteRecordRaw &{
    meta: MyRouteMeta;  
}


// type p = Omit<RouteRecordRaw, 'redirect' | 'caseSensitive' | 'pathToRegexpOptions'| '/* 其他你不需要的属性 */'> &{
//     meta: MyRouteMeta;  
// } ;