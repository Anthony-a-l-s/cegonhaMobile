//File para saber o tamanho das páginas e fazer a reatividade delas
import {Dimensions} from 'react-native';

const ScreenSize = () => {
  const windowWidth = Dimensions.get('window').width;
  if (windowWidth < 360) {
    return 'xsmall';
  } else if (windowWidth >= 360 && windowWidth <= 426) {
    return 'small';
  } else if (windowWidth >= 426 && windowWidth <= 470) {
    return 'normal';
  } else if (windowWidth >= 470 && windowWidth <= 640) {
    return 'large';
  } else {
    return 'xlarge';
  }
};

export default ScreenSize;
