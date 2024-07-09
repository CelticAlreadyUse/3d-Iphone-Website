import { Html, OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import React, { Suspense } from 'react'
import Lights from './Lights'
import * as THREE from 'three'
import IphoneModel from './IphoneModel'
import Loader from './Loader'
const ModelView = ({
  index,groupRef,gsapType,controllRef,
  setRotationState,item,size
}) => {
  return (
    <View
    index={index}
    id={gsapType}
    className={`w-full h-full absolute
      ${index === 2 ? 'right-[-100%]' : ''}`}
    >
      {/* Ambient Light */}
        <ambientLight intensity={0.3}></ambientLight>
      <PerspectiveCamera makeDefault position={[0,0,4]}></PerspectiveCamera>
      <Lights/>
      <OrbitControls
      makeDefault
      ref={controllRef}
      enablePan={false}
      rotateSpeed={0.4}
      enableZoom={false}
      target0={new THREE.Vector3(0,0,0)}
      onEnd={()=>setRotationState(controllRef.current.getAzimuthalAngle())}
      />
      <group ref={groupRef} name={`${index == 1 ? 'small' : 'large'}`}
      position={[0,0,0]}>
      <Suspense fallback={<Html><Loader/></Html>}>
        <IphoneModel
        scale={index == 1 ? [15,15,15] : [17,17,17]}
        item={item}
        size={size}
        />
      </Suspense>
      </group>
    </View>
  )
}

export default ModelView