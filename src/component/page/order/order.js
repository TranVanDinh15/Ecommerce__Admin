import classNames from 'classnames/bind';
import Header from '../../Header/Header';
import styles from './order.module.scss';
const cx = classNames.bind(styles);
const Order = () => {
    return (
        <div className={cx('wrapperOrder')}>
            <Header />
            <div className={cx('ContainerOrder')}></div>
        </div>
    );
};
export default Order;
