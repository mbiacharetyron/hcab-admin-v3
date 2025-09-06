import React from 'react';

const PanicManagementTest = () => {
  console.log('PanicManagementTest: Component rendering');
  
  return (
    <div style={{ padding: '20px', background: 'lightblue', minHeight: '100vh' }}>
      <h1 style={{ color: 'red', fontSize: '24px' }}>TEST: Panic Management Page</h1>
      <p>If you can see this, the component is rendering correctly.</p>
      <div style={{ background: 'yellow', padding: '10px', margin: '10px' }}>
        This is a test component to verify routing and rendering.
      </div>
    </div>
  );
};

export default PanicManagementTest;
