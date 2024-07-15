import { Result, Button } from '@arco-design/web-react';

const NetworkError = () => {
    return (
        <div>
            <Result
                status='error'
                title='服务器故障'
                subTitle='服务器似乎出问题了。请稍等一段时间后再尝试了'
                extra={[
                    <Button key='again' style={{ margin: '0 16px' }} onClick={() => window.location.reload()}>
                        再次尝试
                    </Button>
                ]}
            ></Result>
        </div>
    );
};

export default NetworkError;
