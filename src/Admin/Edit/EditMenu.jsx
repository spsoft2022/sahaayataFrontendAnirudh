import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditMenu() {
    const [menu, setMenu] = useState([]);
    const [selectedHeadings, setSelectedHeadings] = useState({});
    const [menuHeading, setMenuHeading] = useState('');
    const [menuSubHeadings, setMenuSubHeadings] = useState('');
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [subMenuChildren, setSubMenuChildren] = useState([]);
    const [selectedChildHeadings, setSelectedChildHeadings] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://192.168.5.56:8089/workshop");
            const workshops = response.data;
            setMenu(workshops.map(workshop => workshop.heading));
            setSubMenuChildren(workshops); // Assuming workshops contains parent-child relationship
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCheckboxChange = (heading) => {
        setSelectedHeadings(prevSelectedHeadings => ({
            ...prevSelectedHeadings,
            [heading]: !prevSelectedHeadings[heading]
        }));
    };

    const handleSave = () => {
        const selected = Object.keys(selectedHeadings).filter(heading => selectedHeadings[heading]);
        console.log('Selected Headings:', selected); // Debugging
    
        const buildNestedStructure = (heading) => {
            const children = subMenuChildren.filter(child => child === heading)
                .map(child => ({
                    heading: child.heading,
                    children: buildNestedStructure(child.heading)
                }));
            console.log(`Children of ${heading}:`, children); // Debugging
            return children.length > 0 ? children : [];
        };
    
        const result = {
            menuHeading: menuHeading,
            menuSubHeadings: selected.reduce((acc, heading) => {
                const nestedChildren = buildNestedStructure(heading).map(child => {
                    if (child.children.length > 0) {
                        return { [child.heading]: child.children.map(subChild => subChild.heading) };
                    } else {
                        return child.heading;
                    }
                });
    
                // Include the selected child headings if they belong to this heading
                const childrenHeadings = subMenuChildren.filter(child => child.parent === heading).map(child => child.heading);
                const selectedChildrenForHeading = selectedChildHeadings.filter(child => childrenHeadings.includes(child));
                
                // Adjusting to match the desired output format
                if (selectedChildrenForHeading.length > 0) {
                    acc[heading] = selectedChildrenForHeading;
                } else {
                    const nestedStructure = nestedChildren.reduce((nestedAcc, item) => {
                        if (typeof item === 'string') {
                            nestedAcc.push(item);
                        } else {
                            const childKey = Object.keys(item)[0];
                            nestedAcc.push({ [childKey]: item[childKey] });
                        }
                        return nestedAcc;
                    }, []);
    
                    acc[heading] = nestedStructure.length > 0 ? nestedStructure : [];
                }
    
                console.log(`Acc for ${heading}:`, acc[heading]); // Debugging
                return acc;
            }, {})
        };
    
        console.log('Final Result:', result);
    
        // Clear the state
        setSelectedHeadings({});
        setMenuHeading('');
        setSelectedChildHeadings([]);
    };
    
    
    
    
    
    
    const AddSubMenu = async () => {
        const submenu = {
            heading: menuSubHeadings
        }
        try {
            const response = await axios.post("http://192.168.5.56:8089/workshop", submenu, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            const newSubMenu = { parent: menuHeading, heading: menuSubHeadings };
            setSubMenuChildren([...subMenuChildren, newSubMenu]);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        handleClose();
    };

    const handleSubMenuClick = (heading) => {
        setShow(true); // Open the modal
        setMenuSubHeadings(heading);
        setSelectedChildHeadings(subMenuChildren.filter(child => child.parent === heading).map(child => child.heading));
    };

    const handleClose = () => {
        setShow(false);
        setMenuSubHeadings('');
    };

    const handleChildCheckboxChange = (childHeading) => {
        setSelectedChildHeadings(prevSelectedChildHeadings => {
            const isSelected = prevSelectedChildHeadings.includes(childHeading);
            
            console.log("Toggling child heading:", childHeading);
            console.log("Previous selected child headings:", prevSelectedChildHeadings);
    
            if (isSelected) {
                const updatedSelection = prevSelectedChildHeadings.filter(heading => heading !== childHeading);
                console.log("New selection after removing:", updatedSelection);
                return updatedSelection;
            } else {
                const updatedSelection = [...prevSelectedChildHeadings, childHeading];
                console.log("New selection after adding:", updatedSelection);
                return updatedSelection;
            }
        });
    };
    

    return (
        <div className='container my-4'>
            <div className='row'>
                <div className='col-4'>
                    <div className='form-group'>
                        <label className='form-label' htmlFor="">Menu Heading</label>
                        <input
                            className='form-control'
                            placeholder='Menu Heading'
                            type="text"
                            value={menuHeading}
                            onChange={(e) => setMenuHeading(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-8'>
                    <div className='d-flex justify-content-between mb-3'>
                        <h6 className='my-auto'>Menu Sub Headings</h6>
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Add SubMenu
                        </Button>
                        <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Add New SubMenu Heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group>
                                    <Form.Label>Sub Heading</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Sub Menu Heading"
                                        value={menuSubHeadings}
                                        onChange={(e) => setMenuSubHeadings(e.target.value)}
                                    />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setModalShow(false)}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={AddSubMenu}>
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <div className="checkbox-container">
                        {menu.map((heading, index) => (
                            <div key={index} className="form-check checkbox-item">
                                <div className='d-flex justify-content-between align-items-center w-100'>
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={!!selectedHeadings[heading]}
                                            onChange={() => handleCheckboxChange(heading)}
                                            id={`checkbox-${index}`}
                                        />
                                        <label className="form-check-label label-text ms-3" htmlFor={`checkbox-${index}`}>
                                            {heading}
                                        </label>
                                    </div>
                                    {selectedHeadings[heading] && (
                                        <Button className="btn btn-danger btn-sm me-3" style={{ borderRadius: '50%', fontSize: '8px', width: '23px' }} variant="primary" onClick={() => handleSubMenuClick(heading)}>
                                            <i className="fa-solid fa-plus"></i>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <Modal show={show} onHide={handleClose} size='lg' centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Assign Child Headings for {menuSubHeadings}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {subMenuChildren
                                   
                                    .map((child, index) => (
                                        <div key={index}>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedChildHeadings.includes(child.heading)}
                                                    onChange={() => handleChildCheckboxChange(child.heading)}
                                                />
                                                <label className="ms-3">{child.heading}</label>
                                            </div>
                                        </div>
                                    ))}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary mt-3" onClick={handleSave}>Save</button>
        </div>
    );
}

export default EditMenu;
