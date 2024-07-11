// Footer.js
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles['footer']}>
            <div className={styles['footer-content']}>
                <div className={styles['footer-section']}>
                    <h4>相关资源</h4>
                    <ul>
                        <li>Ant Design</li>
                        <li>Ant Design Charts</li>
                        <li>Pro Components</li>
                        <li>Ant Design Mobile</li>
                        <li>Ant Design Landing</li>
                        <li>Scaffolds</li>
                        <li>Umi</li>
                        <li>Dumi</li>
                        <li>qiankun</li>
                        <li>ahooks</li>
                        <li>Ant Motion</li>
                    </ul>
                </div>
                <div className={styles['footer-section']}>
                    <h4>社区</h4>
                    <ul>
                        <li>Awesome Ant Design</li>
                        <li>Medium</li>
                        <li>Twitter</li>
                        <li>Ant Design 专栏</li>
                        <li>体验科技专栏</li>
                        <li>SEE Conf</li>
                    </ul>
                </div>
                <div className={styles['footer-section']}>
                    <h4>帮助</h4>
                    <ul>
                        <li>GitHub</li>
                        <li>报告 Bug</li>
                        <li>讨论列表</li>
                        <li>Ant Design 实战教程</li>
                        <li>讨论区</li>
                        <li>StackOverflow</li>
                        <li>SegmentFault</li>
                    </ul>
                </div>
                <div className={styles['footer-section']}>
                    <h4>更多产品</h4>
                    <ul>
                        <li>语雀</li>
                        <li>AntV</li>
                        <li>Egg</li>
                        <li>Kitchen</li>
                    </ul>
                </div>
            </div>
            <div className={styles['footer-bottom']}>
                <span>Copyright &copy; www.csu.edu.cn</span>
            </div>
        </footer>
    );
};

export default Footer;
