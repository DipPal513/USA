/* eslint-disable @next/next/no-img-element */
import Style from './loadingSpinner.module.css';

const LoadingSpinner = () => {
    return (
        <div className={Style.loadingContainer}>
            <div className={Style.ldsRoller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
    );
};

export default LoadingSpinner;