import SubmitButton from "@/components/custom/SubmitButton";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { languages } from "@/data/languages";
import { firestore } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  const handleSubmit = async (formData: FormData) => {
    "use server"

    const language = formData.get("language")
    const code = formData.get("editor")

    const data = {
      code: code,
      language: language
    }

    let docId = null

    try {
      const docRef = await addDoc(collection(firestore, "codes"), data);
      docId = docRef.id
    } catch {

    }

    if (docId) {
      redirect(`/code/${docId}`)
    }
  }

  return (
    <div className="justify-center items-center">
      <form action={handleSubmit} className="w-1/2 mx-auto mt-4 flex flex-col space-y-4">
        <p className="text-2xl text-center font-semibold pb-2">Code Share</p>
        <div className="flex gap-2 items-center">
          <p>Select the language</p>
          <Select name="language" required>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  languages.map((item) => {
                    return <SelectItem
                      key={item.shortcut}
                      value={item.shortcut}
                    >
                      <div className="flex gap-2 items-center">
                        <Image height={500} width={500} className="w-4" src={`/${item.icon}` ?? "/"} alt="icon" />
                        {item.language}
                      </div>
                    </SelectItem>
                  })
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          rows={24}
          cols={8}
          name="editor"
          placeholder={`Enter your code`}
          className="border-2 border-gray-500"
          required
        />
        <SubmitButton style="self-end" />
      </form>
    </div>
  );
}
