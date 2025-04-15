import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function PaymentPage() {
  const navigate = useNavigate(); // Hook for navigation
  const [donationAmount, setDonationAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(false);
    

const { id, payLimit } = useParams();



  const handleSliderChange = (e) => {
    setDonationAmount(parseInt(e.target.value, 10));
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    if (e.target.value) {
      setDonationAmount(parseInt(e.target.value, 10) || 0);
    }
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
  
    const donationData = {
      id,
      amount: donationAmount,
      fullName,
      email,
      paymentMethod,
      ...(paymentMethod === 'card' && { cardNumber, expiryDate, cvv }),
      ...(paymentMethod === 'upi' && { upiId }),
      ...(paymentMethod === 'bank' && { bankName, accountNumber, ifscCode }),
    };
  
    try {
      const response = await fetch('http://localhost:5000/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donationData),
      });
  
      if (!response.ok) throw new Error('Payment failed');
  
      setPaymentComplete(true);
    } catch (error) {
      console.error('Payment Error:', error);
      alert('There was an issue processing your payment. Please try again.');
    }
  };
  

  // Payment method components
  const CardPaymentForm = () => (
    <>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Card Number</label>
        <input 
          type="text" 
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Expiry Date</label>
          <input 
            type="text" 
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">CVV</label>
          <input 
            type="text" 
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
      </div>
    </>
  );

  const UpiPaymentForm = () => (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium">UPI ID</label>
      <input 
        type="text" 
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        placeholder="username@upi"
        className="w-full p-3 border border-gray-300 rounded-md"
        required
      />
      <p className="mt-2 text-sm text-gray-600">Enter your UPI ID to make payment directly from your linked bank account</p>
    </div>
  );

  const BankTransferForm = () => (
    <>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Bank Name</label>
        <input 
          type="text" 
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Account Number</label>
        <input 
          type="text" 
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium">IFSC Code</label>
        <input 
          type="text" 
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>
    </>
  );

  if (paymentComplete) {
    return (
      <div className="bg-green-50 p-8 rounded-lg shadow-md max-w-md mx-auto text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold mb-4">Thank You For Your Donation!</h2>
        <p className="mb-6">Your contribution of ${donationAmount} will make a real difference in our conservation efforts.</p>
        <p className="mb-8">A receipt has been sent to your email address.</p>
        <button 
          onClick={() => navigate(`/`)}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Make Your Donation</h2>
      
      {/* Donation Amount Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Select Amount</h3>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Rs10</span>
            <span>Rs{payLimit}</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max={payLimit}
            step="10" 
            value={donationAmount} 
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-3">$</span>
            <input 
              type="text" 
              value={customAmount || donationAmount}
              onChange={handleCustomAmountChange}
              className="w-full p-3 pl-8 border border-gray-300 rounded-md text-lg"
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmitPayment}>
        {/* Personal Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Your Information</h3>
          
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Full Name</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
          
          <div className="grid grid-cols-3 gap-2 mb-6">
            <button 
              type="button"
              className={`p-3 border rounded-md text-center ${paymentMethod === 'card' ? 'bg-blue-50 border-blue-500' : 'bg-white'}`}
              onClick={() => setPaymentMethod('card')}
            >
              <div className="text-xl mb-1">💳</div>
              <div className="text-sm">Card</div>
            </button>
            
            <button 
              type="button"
              className={`p-3 border rounded-md text-center ${paymentMethod === 'upi' ? 'bg-blue-50 border-blue-500' : 'bg-white'}`}
              onClick={() => setPaymentMethod('upi')}
            >
              <div className="text-xl mb-1">📱</div>
              <div className="text-sm">UPI</div>
            </button>
            
            <button 
              type="button"
              className={`p-3 border rounded-md text-center ${paymentMethod === 'bank' ? 'bg-blue-50 border-blue-500' : 'bg-white'}`}
              onClick={() => setPaymentMethod('bank')}
            >
              <div className="text-xl mb-1">🏦</div>
              <div className="text-sm">Bank</div>
            </button>
          </div>
        </div>

        {/* Payment Details Based on Selected Method */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
          
          {paymentMethod === 'card' && <CardPaymentForm />}
          {paymentMethod === 'upi' && <UpiPaymentForm />}
          {paymentMethod === 'bank' && <BankTransferForm />}
        </div>
        
        <button
          type="submit"
          className="w-full py-4 bg-green-600 text-white text-lg font-bold rounded-md hover:bg-green-700 transition-colors"
        >
          Complete Donation
        </button>
      </form>
    </div>
  );
}