/*
 * @Date: 2024-06-27 15:32:37
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-06-27 15:51:09
 * @FilePath: \Study-Vue3-Ts\src\env.d.ts
 * @Description: Do not edit
 */
interface ImportMetaEnv {
  VITE_APP_ENVIRONMENT: 'DEV' | 'STAG' | 'UAT' | 'PROD',
  // api gateway
  VITE_APP_APIGATEWAY_BACKEND_HOST: string
  // More environment variables...
}

