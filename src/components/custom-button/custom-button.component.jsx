import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ otherProps, children }) => (
    <button className='custom-button' {...otherProps}>
        {children}
    </button>
)

export default CustomButton;
