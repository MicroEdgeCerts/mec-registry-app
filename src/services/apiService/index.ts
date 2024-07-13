import axios, { type AxiosResponse} from "axios";
import { apiURL } from '@/config'




type OptionType = {
  params?: string | Record<string,string|null> | null, 
  method?: string
  data?: any | null
  headers?: any | null
}

export class Auth401Error{
  message: string
  constructor( message: string) {
    this.message = message;
  }
}

type CachedTokeType  = {
  access_token: string 
}
/* #TOD middleware to keep authtoken refrehed */
const refreshTokenMiddleware = ()=> {

}

/* #TOD middleware to keep authtoken refrehed */
const getCachedToken = (): CachedTokeType|null=> {
  return null
}

const refreshPath = "/token/refresh";

export const ajax = async ( path: string, opt : OptionType = {} ) => {
  if( path != refreshPath ) {
    await refreshTokenMiddleware();
  }
  const data:Record<string, any> = {}
  data['method'] = opt['method'] || "GET"
  let headers: Record<string, string> = {}
  const token = getCachedToken();
  if( token ) {
    headers["Authorization"] = `Bearer ${token.access_token}` 
  }
  if( opt['headers'] ) {
    headers = {
      ...headers,
      ...(opt['headers'] || {})
    }
  }
  let useMutipart = false;
  if( data['method'] !="GET" && opt.data ) {
    if ( typeof opt.data  == 'string' ) {
      data['body'] = opt.data
    } else if ( opt.data  instanceof FormData ) {
      data['body'] = opt.data
      useMutipart = true;
    } else {
      data['body'] = JSON.stringify( opt.data )
    }
  }
  if( ! useMutipart && !headers["Content-Type"] ) {
    headers["Content-Type"] = "application/json"
  }
  data["headers"] = headers
 
  const res =  await axios(`${apiURL}/${path}`, data  )
    .then( ( res: AxiosResponse ) => { 
      if( res.status == 401 ){
      console.log(`got response ${res}`)
     }
     return Promise.all( [ res.status, res.data ]) } 
    ).then(( res )=> {
      const [ status , data ]  = res;
      switch( status ){
        case 401:
          throw new Auth401Error( data.detail )
          break;
        case 200:
          return data;
          break;
        default:
          /* TODO: Something went wrong errror global handler */
          throw new Error( typeof data == 'object' ? data.detail : data );
          break;
      } 
    })
  return res;
}

export const generatePath = ( path: string, opt: OptionType = {} ):string=> {
  const queries:string[] = [];
  if( opt.params && typeof opt.params == 'object' ) {
    const data = opt.params as Record<string,string>
    Object.keys(data).forEach( (key:string ) => {
      const value = data[key] || null;
      if( value != null ) {
        queries.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      }
    })
  }
  return `${path}${( queries.length > 0 ? "?":"" )}${queries.join("&")}`;
}

export const get = async ( path: string, opt: OptionType = {}) => {
  return ajax( generatePath( path, opt ), {method:"GET"});
}

export const post = async ( path: string, opt: OptionType = {}) => {
  return ajax( generatePath( path, opt ), {...opt, method:"POST", data:( opt.data || {})});
}

export const deleteReq = async ( path: string, opt: OptionType = {}) => {
  return ajax( generatePath( path, opt ), {method:"DELETE", data:( opt.data || {})});
}