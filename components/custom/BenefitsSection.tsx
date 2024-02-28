/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cnUygawHjiu
 */

export default function BenefitsSection() {
  return (
    <div className="">
      <div className="flex-1">
        <section className="container px-4 py-6 mx-auto md:px-6 lg:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <ClockIcon className="w-12 h-12 mb-4 text-gray-900" />
              <h2 className="mb-4 text-2xl font-bold">Save Time</h2>
              <p className="text-gray-500">No need to watch the entire video. Get the summary and save time.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <CheckIcon className="w-12 h-12 mb-4 text-gray-900" />
              <h2 className="mb-4 text-2xl font-bold">Accurate Summaries</h2>
              <p className="text-gray-500">Our AI-powered tool provides accurate summaries of your videos.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <CloudIcon className="w-12 h-12 mb-4 text-gray-900" />
              <h2 className="mb-4 text-2xl font-bold">Cloud Based</h2>
              <p className="text-gray-500">Access your video summaries from anywhere at any time.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}


function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function CloudIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  )
}
