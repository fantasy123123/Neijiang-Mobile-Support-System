// 注册界面
import {Link, useNavigate} from "react-router-dom";
import './RegisterPage.css'
import touristSelected from './image/touristSelected.png'
import touristNotSelected from './image/touristNotSelected.png'
import shopkeeperSelected from './image/shopkeeperSelected.png'
import shopkeeperNotSelected from './image/shopkeeperNotSelected.png'
import {useState} from "react";
import {Button} from "@arco-design/web-react";

const RegisterPage = () => {
    const navigate=useNavigate()
    const [selectTourist,setSelectTourist]=useState(true)

  return (
    <div className={'RegisterPage'}>
      <div className={'registerCard'}>
          <div className={'registerCardImage'}>
          </div>
          <div
              style={{
                  position: 'absolute',
                  left: '71%',
                  top: '8%',
                  right: '1%',
                  bottom: '5%',
                  textAlign: 'center',
              }}
          >
              <div style={{textAlign:'center',fontSize:25,fontWeight:"bold",color:'deepskyblue',marginTop:'3%'}}>
                  请选择您的身份
              </div>
              <div>
                  <div style={{width:'100%',display:'flex',justifyContent:'space-around',marginTop:'15%'}}>
                      <div style={{width:'41.5%',fontSize:20,color:selectTourist?'#165DFF':'grey'}}>
                          个人
                      </div>
                      <div style={{width:'41.5%',fontSize:20,color:selectTourist?'grey':'#165DFF'}}>
                          商户
                      </div>
                  </div>
                  <div style={{width:'100%',display:'flex',justifyContent:'space-around',marginTop:'10px'}}>
                      <img
                          style={{cursor:'pointer'}}
                          src={selectTourist?touristSelected:touristNotSelected}
                          alt={'tourist'}
                          width={'41.5%'}
                          onClick={()=>{setSelectTourist(true)}}
                      />
                      <img
                          style={{cursor:'pointer'}}
                          src={selectTourist?shopkeeperNotSelected:shopkeeperSelected}
                          alt={'shopkeeper'}
                          width={'41.5%'}
                          onClick={()=>{setSelectTourist(false)}}
                      />
                  </div>
              </div>
              <Button
                  type={'primary'}
                  style={{marginTop:'10%',float:'right',marginRight:'10%',fontSize:17}}
                  onClick={()=>{navigate(selectTourist?'/Register/TouristRegister':'/Register/ShopkeeperRegister')}}
              >
                  继续
              </Button>
              <div style={{textAlign:'center',position:'absolute',bottom:0,left:0,width:'100%'}}>
                  已有帐号？
                  <Link to={'/SignIn'} style={{textDecoration:'none'}}>立即登录！</Link>
              </div>
          </div>
      </div>
    </div>
  );
};
export default RegisterPage;
