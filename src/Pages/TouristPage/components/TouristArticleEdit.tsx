import React from "react";
import { useEffect, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";

const TouristArticleEdit = () => {
    const [vd, setVd] = useState<Vditor>();
    useEffect(() => {
        const vditor = new Vditor("vditor", {
            after: () => {
                vditor.setValue("`Vditor` 最小代码示例");
                setVd(vditor);
            },
            theme: 'classic',
            upload: {
                linkToImgUrl: 'http://localhost:8090/articles/images'
            }
        });
        // Clear the effect
        return () => {
            vd?.destroy();
            setVd(undefined);
        };
    }, []);
    return <div id="vditor" className="vditor" />;
};

export default TouristArticleEdit;