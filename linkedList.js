class Node {
    constructor(data, next = null) {
      this.data = data; //Node 클래스는 연결 리스트의 기본 단위인 노드를 나타냅니다.
      this.next = next; //각 노드는 data (저장할 값)와 next (다음 노드에 대한 참조) 두 개의 속성을 가집니다.
    }
  }
  
  class LinkedList { //LinkedList 클래스는 연결 리스트를 나타냅니다.
    constructor() { //head는 리스트의 첫 번째 노드를 가리킵니다.
      this.head = null; //size는 리스트에 있는 노드의 개수를 나타냅니다.
      this.size = 0;
    }
  
    // Insert at the beginning
    insertAtBeginning(data) {
      this.head = new Node(data, this.head); //이 메서드는 새 노드를 리스트의 시작 부분에 삽입합니다.
      this.size++; //새 노드의 next 필드는 원래의 head를 가리킵니다.
    }
  
    // Insert at the end
    insertAtEnd(data) {
      const node = new Node(data); //이 메서드는 새 노드를 리스트의 끝 부분에 삽입합니다.
      let current; //마지막 노드를 찾아 그 노드의 next 필드를 새 노드로 설정합니다.
      
      if (!this.head) {
        this.head = node;
      } else {
        current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = node;
      }
      this.size++;
    }
  
    // Insert at index
    insertAt(data, index) { //이 메서드는 새 노드를 리스트의 특정 인덱스에 삽입합니다.
      if (index > 0 && index > this.size) { // 삽입 위치까지 이동하면서 해당 위치에 새 노드를 삽입합니다.
        return;
      }
      
      if (index === 0) {
        this.head = new Node(data, this.head);
        return;
      }
      
      const node = new Node(data);
      let current, previous;
      
      current = this.head;
      let count = 0;
      
      while (count < index) {
        previous = current;
        count++;
        current = current.next;
      }
      
      node.next = current;
      previous.next = node;
      
      this.size++;
    }
  
    // Remove at index
    removeAt(index) {
      if (index > 0 && index >= this.size) { //이 메서드는 리스트의 특정 인덱스에 있는 노드를 제거합니다.
        return;
      }
      
      let current = this.head;
      let prev;
      let count = 0;
      
      if (index === 0) {
        this.head = current.next;
      } else {
        while (count < index) {
          count++;
          prev = current;
          current = current.next;
        }
        
        prev.next = current.next;
      }
      this.size--;
    }
  
    // Print the list data
    printListData() {
      let current = this.head; //이 메서드는 리스트에 있는 모든 노드의 데이터를 출력합니다.
      
      while (current) {
        console.log(current.data);
        current = current.next;
      }
    }
  
    // Get the size of the list
    getSize() {
      return this.size; //이 메서드는 현재 리스트의 크기(노드의 개수)를 반환합니다.
    }

    //중간값 찾기
    
  }
  