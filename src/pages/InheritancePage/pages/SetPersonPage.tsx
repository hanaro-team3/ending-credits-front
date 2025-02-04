import React, { useState } from 'react';
import { PageProps } from '../types';
import * as styled from '../UploadPhotoPage/styles';
import BlueButton from '../../../ui/BlueBtn';
import WhiteButton from '../../../ui/WhiteBtn';
import { Executor } from '../../../services/dto/Will';
import { message } from 'antd';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';

const SetPersonPage: React.FC<PageProps> = ({
  onNext,
  onPrev,
  formData,
  setFormData,
}): JSX.Element => {
  const [executors, setExecutors] = useState<Executor[] | []>(
    formData.executors == null
      ? [{ name: '', relation: '', phoneNumber: '', priority: 1 }]
      : formData.executors.length > 0
      ? formData.executors
      : [{ name: '', relation: '', phoneNumber: '', priority: 1 }]
  );

  const updateFormData = (newExecutors: Executor[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      executors: newExecutors,
    }));
  };

  const handleNameChange = (index: number, value: string) => {
    const newExecutors = [...executors];
    newExecutors[index].name = value;
    setExecutors(newExecutors);
    updateFormData(newExecutors);
  };

  const handleRelationshipChange = (index: number, value: string) => {
    const newExecutors = [...executors];
    newExecutors[index].relation = value;
    setExecutors(newExecutors);
    updateFormData(newExecutors);
  };

  const handlePhoneNumberChange = (index: number, value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^0-9]/g, '');

    // 11자리로 제한
    const limitedNumbers = numbers.slice(0, 11);

    // 000-0000-0000 형식으로 포맷팅
    let formattedNumber = '';
    if (limitedNumbers.length <= 3) {
      formattedNumber = limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      formattedNumber = `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(
        3
      )}`;
    } else {
      formattedNumber = `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(
        3,
        7
      )}-${limitedNumbers.slice(7)}`;
    }

    const newExecutors = [...executors];
    newExecutors[index].phoneNumber = formattedNumber;
    setExecutors(newExecutors);
    updateFormData(newExecutors);
  };

  const handleAddExecutor = (prevPriority: number) => {
    const newExecutors = [
      ...executors,
      { name: '', relation: '', phoneNumber: '', priority: prevPriority + 1 },
    ];
    setExecutors(newExecutors);
    updateFormData(newExecutors);
  };

  const handleRemoveExecutor = () => {
    if (executors.length > 1) {
      const newExecutors = executors.slice(0, -1); // 마지막 항목 삭제
      setExecutors(newExecutors);
      updateFormData(newExecutors);
    } else {
      message.error('첫 번째 항목은 삭제할 수 없습니다.');
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(executors);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // 우선순위 재할당
    const updatedExecutors = items.map((executor, i) => ({
      ...executor,
      priority: i + 1,
    }));

    setExecutors(updatedExecutors);
    updateFormData(updatedExecutors);
  };

  return (
    <styled.UploadPageContainer>
      <styled.TopContainer>
        <styled.Title>
          3. <span style={{ color: '#4792dc' }}>유언집행자</span>를
          지정해주세요.
        </styled.Title>
        <styled.SubTitle>
          유언 내용을 집행하기 위한 동기 이전, 예금 인출 동의 <br />
          사무처리에 대한 업무 권한을 가지는 사람을 지정해주세요.
        </styled.SubTitle>

        <styled.InheritorPageContainer>
          <DragDropContext onDragEnd={handleDragEnd}>
            <StrictModeDroppable droppableId="executors">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {executors.map((executor, index) => (
                    <Draggable
                      key={`executor-${index}`}
                      draggableId={`executor-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <styled.InheritorPageSection>
                            <div {...provided.dragHandleProps}>
                              {executors.length > 1 && (
                                <span style={{ color: '#999' }}>
                                  ⋮드래그하여 순서 변경
                                </span>
                              )}
                            </div>
                            {/* 기존 입력 필드들 */}
                            {executors.length > 1 && (
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'flex-start',
                                  gap: '10px',
                                }}
                              >
                                <styled.Page6InputDivText>
                                  우선순위 {executor.priority}
                                </styled.Page6InputDivText>
                              </div>
                            )}
                            {/* 성함 */}
                            <styled.Page6InputDiv>
                              <styled.Page6InputDivText>
                                성함
                              </styled.Page6InputDivText>
                              <styled.Page6Input
                                value={executor.name}
                                onChange={(e) =>
                                  handleNameChange(index, e.target.value)
                                }
                                style={{
                                  padding: '0 10px',
                                  fontSize: '14px',
                                }}
                              />
                            </styled.Page6InputDiv>
                            {/* 관계 */}
                            <styled.Page6InputDiv>
                              <styled.Page6InputDivText>
                                관계
                              </styled.Page6InputDivText>
                              <styled.Page6Select
                                value={executor.relation}
                                onChange={(e) =>
                                  handleRelationshipChange(
                                    index,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="" disabled>
                                  관계를 선택해 주세요.
                                </option>
                                <option value="배우자">배우자</option>
                                <option value="부모">부모</option>
                                <option value="자녀">자녀</option>
                                <option value="법정상속인">법정상속인</option>
                                <option value="국가 등에 기부(유증)">
                                  국가 등에 기부(유증)
                                </option>
                              </styled.Page6Select>
                            </styled.Page6InputDiv>
                            {/* 전화번호 */}
                            <styled.Page6InputDiv>
                              <styled.Page6InputDivText>
                                전화번호
                              </styled.Page6InputDivText>
                              <styled.Page6Input
                                value={executor.phoneNumber}
                                onChange={(e) =>
                                  handlePhoneNumberChange(index, e.target.value)
                                }
                                placeholder="숫자만 입력하세요"
                                style={{
                                  padding: '0 10px',
                                  fontSize: '14px',
                                }}
                              />
                            </styled.Page6InputDiv>
                          </styled.InheritorPageSection>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        </styled.InheritorPageContainer>

        <styled.ButtonSection>
          <BlueButton
            variant="small"
            style={{
              fontWeight: '500',
              fontSize: '11px',
              marginTop: '8px',
              marginBottom: '60px',
              marginRight: '5px',
              outline: 'none',
            }}
            onClick={() => handleAddExecutor(executors.length)}
          >
            추가하기
          </BlueButton>
          <WhiteButton
            variant="small"
            style={{
              background: 'lightgray',
              color: 'white',
              fontWeight: '500',
              fontSize: '11px',
              marginTop: '8px',
              marginBottom: '60px',
              marginRight: '15px',
              outline: 'none',
            }}
            onClick={handleRemoveExecutor}
          >
            삭제하기
          </WhiteButton>
        </styled.ButtonSection>
      </styled.TopContainer>
      <styled.ButtonBottomDiv>
        <WhiteButton
          variant="medium"
          onClick={() => {
            console.log('Page 6 - Going back:', formData.executors);
            onPrev();
          }}
          style={{ marginRight: '8px' }}
        >
          이전으로
        </WhiteButton>
        <BlueButton
          variant="medium"
          onClick={() => {
            console.log('Page 6 - Moving forward:', formData.executors);
            onNext();
          }}
        >
          다음으로
        </BlueButton>
      </styled.ButtonBottomDiv>
    </styled.UploadPageContainer>
  );
};

export default SetPersonPage;
