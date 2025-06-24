import { Spin } from "antd";
import { Loading3QuartersOutlined } from '@ant-design/icons';
import ColorConstants from "../../../constants/ColorConstants";

const Loading = () => {
    return(
        <Spin
            size="large"
            indicator={
                <Loading3QuartersOutlined
                    style={{ fontSize: 38, color: ColorConstants.secondaryColor }}
                    spin
                />
            }
        />
    )
}

export default Loading;