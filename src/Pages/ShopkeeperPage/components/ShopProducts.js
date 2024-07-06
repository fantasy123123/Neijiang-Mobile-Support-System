import {Card} from "@arco-design/web-react";
import '../ShopkeeperPage.css'

const ShopProducts=()=>{
    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    设置商户产品
                </div>
                <div style={{width:'100%',display:'flex',justifyContent:'space-around',marginTop:'3%'}}>
                    <Card
                        style={{ width: '28%',cursor:'pointer' }}
                        title='商品管理'
                        className='card-custom-hover-style'
                        hoverable
                    >
                        <div style={{fontSize:17}}>
                            管理以下信息：<br/>产品名称，产品类型，说明，价格，是否推荐。
                        </div>
                    </Card>
                    <Card
                        style={{ width: '28%',cursor:'pointer' }}
                        title='商品推荐'
                        className='card-custom-hover-style'
                        hoverable
                    >
                        <div style={{fontSize:17}}>
                            为商户或者其他用户提供对商户的产品进行推荐的功能。
                        </div>
                    </Card>
                    <Card
                        style={{ width: '28%',cursor:'pointer' }}
                        title='打折活动管理'
                        className='card-custom-hover-style'
                        hoverable
                    >
                        <div style={{fontSize:17}}>
                            为商户提供的宣传其打折活动的功能。
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ShopProducts