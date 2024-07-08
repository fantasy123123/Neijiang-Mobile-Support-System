import {Card} from "@arco-design/web-react";
import '../ShopkeeperPage.css'
import {useNavigate} from "react-router-dom";

const ShopInformation=()=>{
    const navigate=useNavigate()
    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    设置商户信息
                </div>
                <div style={{width:'100%',display:'flex',justifyContent:'space-around',marginTop:'2%'}}>
                    <Card
                        onClick={()=>{navigate('/shopkeeper/shopInformation/type')}}
                        style={{ width: '28%',cursor:'pointer' }}
                        title='经营类型'
                        className='card-custom-hover-style'
                        hoverable
                    >
                        <div style={{fontSize:17}}>
                            管理以下信息：<br/>经营类型名称，经营类型说明，经营类型是否可用，创建时间，创建人。
                        </div>
                    </Card>
                    <Card
                        onClick={()=>{navigate('/shopkeeper/shopInformation/environment')}}
                        style={{ width: '28%',cursor:'pointer' }}
                        title='经营环境'
                        className='card-custom-hover-style'
                        hoverable
                    >
                        <div style={{fontSize:17}}>
                            管理以下信息：<br/>经营环境名称，经营环境说明，经营环境是否可用，创建时间，创建人。
                        </div>
                    </Card>
                    <Card
                        onClick={()=>{navigate('/shopkeeper/shopInformation/place')}}
                        style={{ width: '28%',cursor:'pointer' }}
                        title='经营场所'
                        className='card-custom-hover-style'
                        hoverable
                    >
                        <div style={{fontSize:17}}>
                            管理以下信息：<br/>场所类型名称，场所类型说明，场所类型是否可用，创建时间，创建人。
                        </div>
                    </Card>
                </div>
                <div style={{width:'100%',display:'flex',justifyContent:'space-around',marginTop:'3%'}}>
                    <Card
                        onClick={()=>{navigate('/shopkeeper/shopInformation/product')}}
                        style={{ width: '28%',cursor:'pointer' }}
                        title='产品分类'
                        className='card-custom-hover-style'
                        hoverable
                    >
                        <div style={{fontSize:17}}>
                            管理以下信息：<br/>商品分类名称，所属经营类型，说明，创建时间，创建人，是否可用。
                        </div>
                    </Card>
                    <Card
                        onClick={()=>{navigate('/shopkeeper/shopInformation/map')}}
                        style={{ width: '28%',cursor:'pointer' }}
                        title='商户地图'
                        className='card-custom-hover-style'
                        hoverable
                    >
                        <div style={{fontSize:17}}>
                            将商户所在的地理位置在地图上标示出来。
                        </div>
                    </Card>
                    <Card
                        onClick={()=>{navigate('/shopkeeper/shopInformation/image')}}
                        style={{ width: '28%',cursor:'pointer' }}
                        title='商户相册'
                        className='card-custom-hover-style'
                        hoverable
                    >
                        <div style={{fontSize:17}}>
                            为商户提供的照片管理系统。
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ShopInformation