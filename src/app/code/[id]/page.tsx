import { firestore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { codeToHtml } from 'shiki';

type CodeBlock = {
  code: string,
  language: string
}

const getCode = async (id: string) => {
  const docRef = doc(firestore, "codes", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as CodeBlock
  } else {
    return {
      code: "No record found !!",
      language: "txt"
    }
  }
}

export default async function Code({ params }: { params: { id: string } }) {
  const data = await getCode(params.id)

  const out = await codeToHtml(data.code, {
    lang: data.language,
    theme: 'github-light'
  })

  return <div>
    <div className='w-11/12 mx-auto mt-4'>
      {/* <p className='text-center font-semibold text-xl'>Here is your code</p> */}
      <div dangerouslySetInnerHTML={{ __html: out }} />
    </div>
  </div>
}