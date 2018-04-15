import React from 'react';
import { shallow } from 'enzyme';
import NameForm from './NameForm';

describe('NameForm', () => {
    let component = null;

    // 테스트용 onInsert function, changed 값을 바꿔준다.
    let changed = null;
    const onInsert = (name) => {
        changed = name;
    }

    it('renders correctly', () => {
        component = shallow(<NameForm onInsert={onInsert} />);
    });

    it('matches snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    describe('insert new text', () => {
        it('has a form', () => {
            expect(component.find('form').exists()).toBe(true);
        });
        it('has a input', () => {
            expect(component.find('input').exists()).toBe(true);
        });
        it('simulates input change', () => {
            const mockedEvent = {
                target: {
                    value: 'hello'
                }
            };
            // Simulate event. second parameter is event object.
            component.find('input').simulate('change', mockedEvent);
            expect(component.state().name).toBe('hello');
        });
        it('simulates from submit', () => {
            const mockedEvent = {
                preventDefault: () => null // onSubmit에서 preventDefault호출하므로 막는 함수를 추가.
            };
            component.find('form').simulate('submit', mockedEvent);
            expect(component.state().name).toBe('');
            expect(changed).toBe('hello');
        });
    })
});