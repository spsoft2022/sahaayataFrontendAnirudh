import React from 'react'
import SocailMedia from '../Social Media/SocialMedia'
function Refund() {
  return (
    <div className='container'>
      <h2 className='heading py-3'>Refund and Cancellation Policy</h2>
      <ol className='parafont'>
        <li className=''>
          <p>Amount once paid through the payment gateway shall not be refunded other than in the following circumstances:</p>
        </li>
        <ul style={{listStyleType:'disc'}}>
          <li>
            Multiple times debiting of Customer’s Card/Bank Account due to technical error OR Customer's account being debited with excess amount in a single transaction due to technical error. In such cases, excess amount excluding Payment Gateway charges would be refunded to the Customer.
          </li>
          <li  className='pb-1'>
            Due to technical error, payment being charged on the Customer’s Card/Bank Account but the enrolment for the examination is unsuccessful. Customer would be provided with the enrolment by NISM at no extra cost. However, if in such cases, Customer wishes to seek refund of the amount, he/she would be refunded net the amount, after deduction of Payment Gateway charges or any other charges.
          </li>
        </ul>
        <li className='py-1'>The Customer will have to make an application for refund along with the transaction number and original payment receipt if any generated at the time of making payments.</li>
        <li className='py-1'> If the Customer leaves the Organisation before they complete their service period, there shall be no entitlement to a refund of paid service fees.</li>
        <li className='py-1'>Refunds, if applicable, at the discretion of the Management, will only be made to the debit/credit card used for the original transaction. For the avoidance of doubt, nothing in this agreement shall require the Organisation to refund the Fees (or part thereof) unless such Fees (or part thereof) have previously been paid.</li>
        <li className='py-1'>The application in the prescribed format should be sent to www.sahaayata.org</li>
        <li className='py-1'>The application will be processed manually and after verification, if the claim is found valid, the amount received in excess will be refunded by NISM through electronic mode in favor of the applicant and confirmation sent to the mailing address given in the online registration form, within a period of 21 calendar days on receipt of such claim. It will take 3‐21 days for the money to show in your bank account depending on your bank’s policy.</li>
        <li className='py-1'>Organisation assumes no responsibility and shall incur no liability if it is unable to affect any Payment Instruction(s) on the Payment Date owing to any one or more of the following circumstances:</li>
        <ul style={{listStyleType:'disc'}}>
          <li>
          If the Payment Instruction(s) issued by you is/are incomplete, inaccurate, and invalid and delayed.
          </li>
          <li>
          If the Payment Account has insufficient funds/limits to cover for the amount as mentioned in the Payment Instruction(s)
          </li>
          <li>If the funds available in the Payment Account are under any encumbrance or charge.</li>
          <li>If your Bank or the NCC refuses or delays honoring the Payment Instruction(s)</li>
          <li>Circumstances beyond the control of the organisation (including, but not limited to, fire, flood, natural disasters, bank strikes, power failure, systems failure like computer or telephone lines breakdown due to an unforeseeable cause or interference from an outside force)</li>
          <li className='pb-1'>In case the payment is not effected for any reason, you will be intimated about the failed payment by an e‐mail.</li>
        </ul>
        <li className='py-1'> User agrees that the Organisation, in its sole discretion, for any or no reason, and without penalty, may suspend or terminate his/her account (or any part thereof) or use of the Services and remove and discard all or any part of his/her account, user profile, or his/her recipient profile, at any time. Organisation may also in its sole discretion and at any time discontinue providing access to the Services, or any part thereof, with or without notice. User agrees that any termination of his /her access to the Services or any account he/she may have or portion thereof may be effected without prior notice, and also agrees that organisation will not be liable to user or any third party for any such termination. Any suspected, fraudulent, abusive or illegal activity may be referred to appropriate law enforcement authorities. These remedies are in addition to any other remedies Organisation may have at law or in equity. Upon termination for any reason, user agrees to immediately stop using the Services.</li>
        <li className='py-1'>
        Organisation may elect to resolve any dispute, controversy or claim arising out of or relating to this Agreement or Service provided in connection with this Agreement by binding arbitration in accordance with the provisions of the Indian Arbitration & Conciliation Act, 1996. Any such dispute, controversy or claim shall be arbitrated on an individual basis and shall not be consolidated in any arbitration with any claim or controversy of any other party.

 
        </li>
      </ol>
      <SocailMedia/>
    </div>
  )
}

export default Refund