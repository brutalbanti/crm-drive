import { IoClose } from 'react-icons/io5'
import { Form, Button } from 'react-bootstrap'
interface popup {
    isPopUp: boolean,
    handlerPopUp: any,
    handleConfirmEdit?: any,
    valueFirst: string,
    handlerValueFirst: any,
    valueAge: string,
    handlerValueAge: any,
    valueRole: string,
    handlerValueRole: any
}

export const PopUp = ({ isPopUp, handlerPopUp, handleConfirmEdit, valueFirst, handlerValueFirst, valueAge, handlerValueAge, valueRole, handlerValueRole }: popup) => {
    return (
        <div className={isPopUp ? "popup visible" : "popup"}>
            <div className="popup__container">
                <Form className="users-change__form">
                    <IoClose className='close-form' onClick={handlerPopUp} />
                    <h2 className="users-change__title">Зміна даних користувача</h2>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Ім'я</Form.Label>
                        <Form.Control type="text" placeholder="Ім'я" value={valueFirst} onChange={handlerValueFirst} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Вік</Form.Label>
                        <Form.Control type="number" placeholder="Вік" value={valueAge} onChange={handlerValueAge} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Оберіть роль користувачу</Form.Label>
                        <Form.Select aria-label="Оберіть роль" onChange={(e) => handlerValueRole(e)}>
                            <option value={valueRole}>{valueRole}</option>
                            {valueRole !== 'Пасажир' &&
                                <option value="Пасажир">Пасажир</option>
                            }
                            {valueRole !== 'Адмін' &&
                                <option value="Адмін">Адмін</option>
                            }
                            {valueRole !== 'Диспетчер' &&
                                <option value="Диспетчер">Диспетчер</option>
                            }
                        </Form.Select>
                    </Form.Group>
                    <div className="user-item__button form">
                        <Button variant="info" onClick={handleConfirmEdit}>Змінити</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}