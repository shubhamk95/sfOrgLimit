public class LimitsController {

    
    @AuraEnabled
    public static list<LimitWrapper> getLimits(){
        list<LimitWrapper> lwrap = new list<LimitWrapper>();
       
        Map<String,System.OrgLimit> limitsMap = OrgLimits.getMap();
        for(System.OrgLimit o : limitsMap.values()){
              lwrap.add(new LimitWrapper(o));
        }
        
         return lwrap;
        
    }
    
    public class LimitWrapper{
        
      @AuraEnabled  public String name{get;set;}
       @AuraEnabled     public Integer usedLimit{get;set;}
         @AuraEnabled       public Integer totalLimit{get;set;}
         @AuraEnabled       public Integer availableLimit{get;set;}
        
        public LimitWrapper(System.OrgLimit l){
           name =  l.getName();
           usedLimit = l.getValue();
            totalLimit = l.getLimit();
            availableLimit = totalLimit - usedLimit;
            
        }
    }
}