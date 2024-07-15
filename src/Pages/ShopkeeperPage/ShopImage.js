import {useEffect, useState} from "react";
import { Image, Button} from "@arco-design/web-react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../api/AxiosApi";

const ShopImage=()=>{
    const navigate=useNavigate()
    const [initData, setInitData] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const accountId = localStorage.getItem("accountId");
                const response = await axiosInstance.get(`/products/merchants/accountId/${accountId}`);
                if (response.data.status === "success") {
                    const images = response.data.data.map(product => ({
                        uid: product.productId.toString(),
                        name: product.productName,
                        url: product.imageUrl
                    }));
                    setInitData(images);
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);
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
                <div style={{marginRight:'5.5%',marginTop:15,display:'flex',justifyContent:'right'}}>
                    <Button
                        size={"large"}
                        style={{border:'1px solid #FF7D00'}}
                        onClick={()=>{navigate('/shopkeeper/shopInformation')}}
                        status={'warning'}
                    >
                        返回
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ShopImage