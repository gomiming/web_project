import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import * as Api from "../../api";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";

const Projects = ({ portfolioOwnerId, isEditable }) => {
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  // setProjects를 명시적으로 전달하기 위해 함수 작성
  const getNewProjectList = (data) => {
    setProjects(data);
  };

  //res.data가 배열인지 확인
  useEffect(() => {
    Api.get("projects", portfolioOwnerId).then((res) => {
      if (Array.isArray(res.data)) {
        setProjects(res.data);
      }
    });
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        {projects.map((project) => (
          <Project
            key={project.projectId}
            project={project}
            setProjects={setProjects}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <ProjectAddForm
            portfolioOwnerId={portfolioOwnerId}
            setProjects={getNewProjectList}
            isAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default Projects;
