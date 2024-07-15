import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Descriptions, Input, Message, Modal } from "@arco-design/web-react";
import AMapLoader from '@amap/amap-jsapi-loader';
import axiosInstance from "../../api/AxiosApi";

const ShopMap = () => {
    const navigate = useNavigate();
    const [ifEdit, setIfEdit] = useState(false);
    const [merchant, setMerchant] = useState(null);
    const [initData, setInitData] = useState({
        province: "",
        city: "",
        district: "",
        street: "",
        township: "",
        streetNumber: "",
    });
    const [editData, setEditData] = useState(initData);

    const column = [
        {
            label: '省',
            value: initData.province,
        },
        {
            label: '市',
            value: initData.city,
        },
        {
            label: '区',
            value: initData.district,
        },
        {
            label: '街道',
            value: initData.street,
        },
        {
            label: '路',
            value: initData.township,
        },
        {
            label: '街道号',
            value: initData.streetNumber,
        },
    ];

    let map = null;

    function initMap(longitude, latitude) {
        window._AMapSecurityConfig = {
            securityJsCode: "0cd187735e348a8064c9d4b996255c5c",
        };
        AMapLoader.load({
            key: "7a425df263feacf89efaa3f9ac3ee842", // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        })
            .then((AMap) => {
                map = new AMap.Map("container", {
                    // 设置地图容器id
                    viewMode: "3D", // 是否为3D地图模式
                    zoom: 16, // 初始化地图级别
                    center: [longitude, latitude], // 初始化地图中心点位置
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function destroyMap() {
        map?.destroy();
    }

    useEffect(() => {
        const fetchMerchantData = async () => {
            try {
                const accountId = localStorage.getItem('accountId');
                const response = await axiosInstance.get(`/merchants/accountId/${accountId}`);
                if (response.data.status === "success") {
                    const { address } = response.data.data;
                    setMerchant(response.data.data);

                    const regex = /(省|市|区|街道|路|号)/;
                    const parts = address.split(regex);
                    let province = parts[0] + (parts[1] || "");
                    let city = parts[2] + (parts[3] || "");
                    let district = parts[4] + (parts[5] || "");
                    let street = parts[6] + (parts[7] || "");
                    let township = parts[8] + (parts[9] || "");
                    let streetNumber = parts[10] + (parts[11] || "");
                    setInitData({ province, city, district, street, township, streetNumber });
                    setEditData({ province, city, district, street, township, streetNumber });
                    console.log(response.data.data.coordinates);
                    const [ longitude, latitude ] = response.data.data.coordinates.split(',');
                    initMap(longitude, latitude);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchMerchantData();

        return () => {
            destroyMap();
        };
    }, []);

    const handleEditOk = async () => {
        setIfEdit(false);
        const address = `${editData.province} ${editData.city} ${editData.district} ${editData.street} ${editData.township} ${editData.streetNumber}`;
        try {
            const locationResponse = await axiosInstance.put(`/merchants`, {
                merchantId: merchant.merchantId,
                ownerId: merchant.ownerId,
                name: merchant.name,
                address: address
            });
            if (locationResponse.data.status === "success") {
                setInitData(editData);
                Message.info('修改成功！');
                destroyMap();
                const response1 = await axiosInstance.get(`/location/address?address=${address}`);
                if (response1.data.status === "success") {
                    const [ longitude, latitude ] = response1.data.message.split(',');
                    initMap(longitude, latitude);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: "90%", height: '90%' }}>
                <div style={{ fontSize: 25, fontWeight: 'bold', color: '#165DFF', textAlign: 'center' }}>
                    商户地图
                </div>
                <div style={{ width: '90%', background: 'white', marginLeft: '5%', marginTop: '2%', borderRadius: 10, border: '1px solid grey', height: '80%', overflow: 'auto' }}>
                    <Button
                        type={'primary'}
                        size={"large"}
                        style={{ marginRight: 50, float: "right", marginTop: 30 }}
                        onClick={() => { setIfEdit(true) }}
                    >
                        修改
                    </Button>
                    <Descriptions
                        column={3}
                        size={'large'}
                        style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 30, paddingBottom: 10 }}
                        title='商户地址'
                        data={column}
                        labelStyle={{ textAlign: 'right' }}
                    />
                    <div id="container" style={{ width: '80%', marginLeft: '10%', height: '65%', marginBottom: 10 }} />
                </div>
                <Button
                    size={"large"}
                    style={{ border: '1px solid #FF7D00', marginTop: 15, float: 'right', marginRight: '5%' }}
                    onClick={() => { navigate('/shopkeeper/shopInformation') }}
                    status={'warning'}
                >
                    返回
                </Button>
                <Modal
                    title='修改地址信息'
                    unmountOnExit={true}
                    maskClosable={false}
                    visible={ifEdit}
                    onOk={handleEditOk}
                    onCancel={() => {
                        setIfEdit(false);
                    }}
                    autoFocus={false}
                >
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <div style={{width: '27%'}}>
                            <div style={{
                                height: 50,
                                width: '100%',
                                justifyContent: 'right',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                省
                            </div>
                            <div style={{
                                height: 50,
                                width: '100%',
                                justifyContent: 'right',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                市
                            </div>
                            <div style={{
                                height: 50,
                                width: '100%',
                                justifyContent: 'right',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                区
                            </div>
                            <div style={{
                                height: 50,
                                width: '100%',
                                justifyContent: 'right',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                街道
                            </div>
                            <div style={{
                                height: 50,
                                width: '100%',
                                justifyContent: 'right',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                路
                            </div>
                            <div style={{
                                height: 50,
                                width: '100%',
                                justifyContent: 'right',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                街道号
                            </div>
                        </div>
                        <div style={{width: '65%'}}>
                            <div style={{
                                height: 50,
                                width: '100%',
                                justifyContent: 'left',
                                display: 'flex',
                                alignItems: 'center' }}>
                                <Input
                                    defaultValue={initData.province}
                                    onChange={value => { setEditData({ ...editData, province: value }) }}
                                    style={{ width: '90%' }}
                                />
                            </div>
                            <div style={{ height: 50, width: '100%', justifyContent: 'left', display: 'flex', alignItems: 'center' }}>
                                <Input
                                    defaultValue={initData.city}
                                    onChange={value => { setEditData({ ...editData, city: value }) }}
                                    style={{ width: '90%' }}
                                />
                            </div>
                            <div style={{ height: 50, width: '100%', justifyContent: 'left', display: 'flex', alignItems: 'center' }}>
                                <Input
                                    defaultValue={initData.district}
                                    onChange={value => { setEditData({ ...editData, district: value }) }}
                                    style={{ width: '90%' }}
                                />
                            </div>
                            <div style={{ height: 50, width: '100%', justifyContent: 'left', display: 'flex', alignItems: 'center' }}>
                                <Input
                                    defaultValue={initData.street}
                                    onChange={value => { setEditData({ ...editData, street: value }) }}
                                    style={{ width: '90%' }}
                                />
                            </div>
                            <div style={{ height: 50, width: '100%', justifyContent: 'left', display: 'flex', alignItems: 'center' }}>
                                <Input
                                    defaultValue={initData.township}
                                    onChange={value => { setEditData({ ...editData, township: value }) }}
                                    style={{ width: '90%' }}
                                />
                            </div>
                            <div style={{ height: 50, width: '100%', justifyContent: 'left', display: 'flex', alignItems: 'center' }}>
                                <Input
                                    defaultValue={initData.streetNumber}
                                    onChange={value => { setEditData({ ...editData, streetNumber: value }) }}
                                    style={{ width: '90%' }}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default ShopMap;
