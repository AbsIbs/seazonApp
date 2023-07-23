import React, { useRef, createContext, useState } from "react";
import BottomSheet from 'react-native-bottomsheet-reanimated';
import { View } from "react-native";

const BottomSheetContext = createContext();

const BottomSheetProvider = ({ children }) => {
  const bottomSheetRef = useRef(null);

  const [isBottomSheetLocked, setBottomSheetLocked] = useState(false);

  const lockBottomSheet = () => {
    setBottomSheetLocked(true);
  };

  const unlockBottomSheet = () => {
    setBottomSheetLocked(false);
  };

  const [bottomSheetOptions, setBottomSheetOptions] = useState({
    height: 150,
    body: <View></View>,
    header: null,
    backgroundColor: '#121212'
  });

  return (
    <BottomSheetContext.Provider
      value={{
        bottomSheetRef,
        bottomSheetOptions,
        setBottomSheetOptions,
        isBottomSheetLocked,
        lockBottomSheet,
        unlockBottomSheet
      }}>
      {children}
      {!isBottomSheetLocked && (
        <BottomSheet
          keyboardAware
          ref={bottomSheetRef}
          initialPosition={'0%'}
          snapPoints={['0%', bottomSheetOptions.height]}
          isBackDrop={true}
          isBackDropDismissByPress={true}
          isRoundBorderWithTipHeader={true}
          bounce={false}
          containerStyle={{ backgroundColor: bottomSheetOptions.backgroundColor }}
          tipStyle={{ backgroundColor: "white" }}
          bodyStyle={{ flex: 1 }}
          header={null}
          body={bottomSheetOptions.body}
        />
      )}
    </BottomSheetContext.Provider>
  );
}

export { BottomSheetContext, BottomSheetProvider };
