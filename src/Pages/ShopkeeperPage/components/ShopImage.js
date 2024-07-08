import {useState} from "react";
import {Space, Image} from "@arco-design/web-react";

const ShopImage=()=>{
    const [initData,setInitData]=useState([
            {
                uid:"1",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
            },
            {
                uid:"2",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
            },
            {
                uid:"3",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp'
            },
            {
                uid:"4",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp'
            },
            {
                uid:"5",
                name:'照片',
                url:'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp'
            },
        ])
    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    商户照片
                </div>
                <div style={{width:'90%',background:'white',marginLeft:'5%',marginTop:'2%',borderRadius:10,border:'1px solid grey',maxHeight:'80%',overflow:'auto'}}>
                    <div
                        style={{
                            width:'90%',
                            marginLeft:'5%',
                            marginTop:'3%',
                            display:'grid',
                            justifyContent:'space-between',
                            gridTemplateColumns:'repeat(auto-fill,200px)',
                            gridGap:10
                    }}>
                        <Image.PreviewGroup>
                            {initData.map((src, index) => (
                                <Image
                                    key={index}
                                    src={src.url}
                                    width={200}
                                    style={{marginBottom:15}}
                                    description={src.name}
                                    footerPosition='outer'
                                    alt={`lamp${index + 1}`}
                                />
                            ))}
                        </Image.PreviewGroup>
                    </div>
                </div>
                <div style={{float:'right',marginRight:'5%',marginTop:5,color:'grey',fontSize:17}}>修改照片请至“基本信息”中</div>
            </div>
        </div>
    )
}

export default ShopImage