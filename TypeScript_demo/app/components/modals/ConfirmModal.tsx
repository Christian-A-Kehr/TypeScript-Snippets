import React from 'react';
import {
  GestureResponderEvent,
  Modal, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import TextRoboto from '../../elements/text/TextRoboto';
import {
  blackOpacity60, veryDarkGrayishRed, veryDarkGrayishBlue, softRed, white,
} from '../../../utils/constants/colors';

type Props = {
  visible: boolean
  title: string
  description: string
  rightButtonText?: string
  onPressConfirm?: (event: GestureResponderEvent) => void
  onPressCancel?: (event: GestureResponderEvent) => void

};

const defaultProps: { rightButtonText: undefined, onPressConfirm: undefined, onPressCancel: undefined } = {
  rightButtonText: undefined,
  onPressConfirm: undefined,
  onPressCancel: undefined,
};

const ConfirmModal: React.FC<Props> = ({
  visible, title, description, rightButtonText, onPressConfirm, onPressCancel,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View
        style={styles.transparentContainer}
      >
        <View style={styles.mainViewContainer}>
          <View style={styles.textContainer}>
            <TextRoboto
              fontWeight={500}
              style={[styles.alignTextCenter, styles.title]}
            >
              {title}
            </TextRoboto>
            <TextRoboto
              style={[styles.alignTextCenter, styles.description]}
            >
              {description}
            </TextRoboto>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onPressConfirm}
            >
              <TextRoboto
                fontWeight={600}
                style={[styles.alignTextCenter, styles.confirmText]}
              >
                {t('global.modals.yes')}
              </TextRoboto>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onPressCancel}
            >
              <TextRoboto style={[styles.alignTextCenter, styles.cancelText]}>
                {rightButtonText || t('global.labels.cancel')}
              </TextRoboto>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
ConfirmModal.defaultProps = defaultProps;
const styles = StyleSheet.create({

  transparentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blackOpacity60,
  },
  mainViewContainer: {
    width: 270,
    backgroundColor: white,
    alignSelf: 'center',
    borderRadius: 10,
  },
  textContainer: {
    height: 100,
    paddingVertical: 20,
  },
  title: {
    paddingBottom: 5,
    fontSize: 17,
  },
  description: {
    color: veryDarkGrayishRed,
    fontSize: 13,
  },
  alignTextCenter: {
    textAlign: 'center',
  },
  buttonsContainer: {
    height: 44,
    width: 270.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderBottomLeftRadius: 10,
    backgroundColor: softRed,
    borderTopColor: veryDarkGrayishBlue,
    borderTopWidth: 0.2,
  },
  confirmText: {
    color: white,
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderBottomRightRadius: 10,
    borderTopColor: veryDarkGrayishBlue,
    borderTopWidth: 0.2,
  },
  cancelText: {
    fontSize: 16,
    color: veryDarkGrayishRed,
  },
});

export default ConfirmModal;
