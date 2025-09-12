import { AlertTriangle } from "lucide-react";

const PanicReportNoLayout = () => {
  console.log('🚨 NO LAYOUT TEST: Component rendering');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc', 
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#dc2626',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AlertTriangle size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#111827' }}>
              Panic Reports - No Layout Test
            </h1>
            <p style={{ color: '#6b7280', margin: 0 }}>
              Testing without AdminLayout component
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <p style={{ color: '#166534', fontWeight: '500', margin: 0 }}>
            ✅ If you can see this, the issue is NOT with the component itself
          </p>
        </div>

        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #fde68a',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <p style={{ color: '#92400e', fontWeight: '500', margin: 0 }}>
            🔍 This bypasses AdminLayout, ProtectedRoute, and all complex components
          </p>
        </div>

        <div style={{
          backgroundColor: '#dbeafe',
          border: '1px solid #93c5fd',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <p style={{ color: '#1e40af', fontWeight: '500', margin: 0 }}>
            📋 Next steps if this works:
          </p>
          <ul style={{ color: '#1e40af', margin: '0.5rem 0 0 1rem' }}>
            <li>Add AdminLayout back</li>
            <li>Add ProtectedRoute back</li>
            <li>Add data fetching back</li>
          </ul>
        </div>

        <button 
          onClick={() => {
            console.log('🚨 NO LAYOUT TEST: Button clicked');
            alert('Button works! Component is rendering correctly.');
          }}
          style={{
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Test Button
        </button>
      </div>
    </div>
  );
};

export default PanicReportNoLayout;

