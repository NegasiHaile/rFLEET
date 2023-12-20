import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import { Button, TransparentButton } from '@components/ui/Button'
import { Check } from '@components/ui/Check'
import { GradientHR } from '@components/ui/GradientHR'

type Props = {
  onClose?: () => void
  onSubmit?: () => void
}
export const CustomerAgreement = ({ onClose, onSubmit }: Props) => {
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false)
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }
  return (
    <div className="p-3 flex flex-col h-full">
      <form onSubmit={onSubmitForm}>
        <div>
          <div className="flex items-center justify-between">
            <div className="font-semibold uppercase">Terms And Conditions</div>
            <AiOutlineClose onClick={onClose} className=" cursor-pointer" />
          </div>

          <div className="my-4">
            <GradientHR />
          </div>
        </div>
        <div className="pr-3 max-h-[300px] text-justify text-sm  flex-grow overflow-auto scrollbar scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-blue-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum est, magni et suscipit excepturi nesciunt
            corporis sed. Similique recusandae maiores perspiciatis consequuntur! Optio ipsam qui voluptate blanditiis
            consequatur! Distinctio temporibus beatae, tempore doloremque similique, obcaecati ad corrupti commodi nemo
            blanditiis earum quisquam, enim modi atque. Nobis laboriosam labore libero, omnis odio assumenda molestias
            officiis? Magnam maiores necessitatibus ex facere, neque minus, repellendus amet officiis harum temporibus
            laboriosam possimus tenetur quia ipsam aspernatur culpa illum animi ea nisi tempora.
          </p>
          <p>
            Iure tempora mollitia eligendi obcaecati. Odit repellendus numquam eaque, beatae fugiat eveniet dolorem ea
            necessitatibus sed quas earum nulla soluta architecto veniam rem unde incidunt distinctio? Aperiam totam
            amet, inventore unde molestiae numquam aliquam eligendi fugiat, mollitia repellat voluptatum repellendus a
            nisi. Ducimus facilis quam laboriosam sunt tempora illo rerum minus obcaecati vel exercitationem fugit,
            quaerat tempore at, saepe error officia officiis beatae voluptas rem quasi sapiente?
          </p>
          <p>
            Tenetur aut consequatur deleniti illum assumenda magni! Nam fuga officia, impedit asperiores tempore
            deserunt quibusdam, magnam illo inventore distinctio accusamus blanditiis corrupti perferendis est? Facilis
            officiis fugiat quam aut similique nemo fuga. Velit distinctio praesentium nisi quaerat eligendi vitae
            iusto, voluptate cupiditate. Nam delectus ea recusandae iusto ut eos corrupti sapiente. Eos alias tempore
            repudiandae!
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex ea necessitatibus, optio error voluptas dolorem
            quas laborum labore nisi dolor tempora minus expedita sit consequatur facilis! Omnis deserunt mollitia culpa
            est inventore molestiae quasi nobis assumenda, id, iste sit fugit. Laboriosam fugit quasi optio mollitia
            velit, alias corporis impedit laborum, quia quas explicabo? Nostrum cum accusantium, officia sit assumenda
            blanditiis, tempore doloribus praesentium illum odio ipsa totam! Aliquam dolores, enim totam consequatur
            dolore magnam unde odit amet nobis nulla! Minima, dolor tempore? Sequi, accusamus dolor. Porro distinctio
            sequi quia rem ullam voluptatem adipisci possimus, explicabo assumenda eaque minima quae quam?
          </p>
        </div>

        <div>
          <div className="my-4">
            <GradientHR />
          </div>
          <Check
            onChange={(value) => setAcceptedTerms(value)}
            label={<div className="font-light">Accept these terms and conditions</div>}
          />

          <div className="flex justify-between mt-4">
            <div>
              <TransparentButton onClick={onClose} type="button">
                Decline
              </TransparentButton>
            </div>
            <Button disabled={!acceptedTerms} type="submit">
              Accept
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
