import React from 'react';

import loadingIcon from '../assets/loading.svg';

interface Props {
  className: string;
}

const Loading = (props: Props) => <img {...props} src={loadingIcon} alt="読込中" />;

export default Loading;
