import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles['footer']}>
            <div className={styles['footer-content']}>
                <div className={styles['footer-section']}>
                    <h3>Related Resources</h3>
                    <ul>
                        <li><a href="https://spring.io/projects/spring-boot" target="_blank" rel="noopener noreferrer">Spring Boot</a></li>
                        <li><a href="https://spring.io/guides" target="_blank" rel="noopener noreferrer">Spring Boot Guides</a></li>
                        <li><a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer">React Documentation</a></li>
                        <li><a href="https://arco.design" target="_blank" rel="noopener noreferrer">ArcoDesign Documentation</a></li>
                        <li><a href="https://docs.oracle.com/javase/8/docs/" target="_blank" rel="noopener noreferrer">Java SE Documentation</a></li>
                        <li><a href="https://restfulapi.net" target="_blank" rel="noopener noreferrer">RESTful API Design</a></li>
                        <li><a href="https://microservices.io" target="_blank" rel="noopener noreferrer">Microservices Architecture</a></li>
                        <li><a href="https://www.docker.com/why-docker" target="_blank" rel="noopener noreferrer">Docker for Java Developers</a></li>
                        <li><a href="https://kubernetes.io/docs/home/" target="_blank" rel="noopener noreferrer">Kubernetes for Spring Boot</a></li>
                    </ul>
                </div>
                <div className={styles['footer-section']}>
                    <h3>Community Support</h3>
                    <ul>
                        <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        <li><a href="https://github.com/websemantics/awesome-ant-design" target="_blank" rel="noopener noreferrer">Awesome Ant Design</a></li>
                        <li><a href="https://slack.com" target="_blank" rel="noopener noreferrer">Slack</a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><a href="https://medium.com" target="_blank" rel="noopener noreferrer">Blog</a></li>
                        <li><a href="https://weixin.qq.com" target="_blank" rel="noopener noreferrer">WeChat Official Account</a></li>
                    </ul>
                </div>
                <div className={styles['footer-section']}>
                    <h3>Help & Feedback</h3>
                    <ul>
                        <li><a href="https://stackoverflow.com/questions/tagged/spring-boot" target="_blank" rel="noopener noreferrer">Common Questions</a></li>
                        <li><a href="https://github.com/spring-projects/spring-boot/issues" target="_blank" rel="noopener noreferrer">Report Bug</a></li>
                        <li><a href="mailto:support@csu.edu.cn">Contact Us</a></li>
                        <li><a href="https://spring.io/guides" target="_blank" rel="noopener noreferrer">User Guidance</a></li>
                        <li><a href="https://stackoverflow.com" target="_blank" rel="noopener noreferrer">StackOverflow</a></li>
                        <li><a href="https://segmentfault.com" target="_blank" rel="noopener noreferrer">SegmentFault</a></li>
                    </ul>
                </div>
                <div className={styles['footer-section']}>
                    <h3>More Services</h3>
                    <ul>
                        <li><a href="https://www.aliyun.com/product/enterprise" target="_blank" rel="noopener noreferrer">Enterprise Solutions</a></li>
                        <li><a href="https://dataplatform.cloud.tencent.com" target="_blank" rel="noopener noreferrer">Data Analysis Platform</a></li>
                        <li><a href="https://developer.apple.com/app-store/" target="_blank" rel="noopener noreferrer">Mobile Applications</a></li>
                        <li><a href="https://www.customsoftware.dev" target="_blank" rel="noopener noreferrer">Custom Development</a></li>
                    </ul>
                </div>
            </div>
            <div className={styles['footer-bottom']}>
                <span>Copyright &copy; 2024 Neijiang Mobile Support Project</span>
            </div>
        </footer>
    );
};

export default Footer;
